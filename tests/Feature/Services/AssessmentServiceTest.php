<?php

namespace Tests\Feature\Services;

use App\DTOs\AssessmentIndexDTO;
use App\DTOs\CreateAssessmentDTO;
use App\Interfaces\SparkHireServiceInterface;
use App\Models\Assessment;
use App\Services\AssessmentService;
use App\Services\Integrations\SparkHire\SparkHireService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;

class AssessmentServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    private function makeIndexDto(array $overrides = []): AssessmentIndexDTO
    {
        return new AssessmentIndexDTO(array_merge([
            'page' => 1,
            'per_page' => 10,
            'order_by' => ['column' => 'created_at', 'direction' => 'desc'],
        ], $overrides));
    }

    private function makeCreateDto(array $overrides = []): CreateAssessmentDTO
    {
        return new CreateAssessmentDTO(array_merge([
            'candidate_name' => 'Jane Doe',
            'candidate_email' => 'jane@example.com',
            'job_uuid' => 'job-uuid-123',
            'question_set_uuid' => 'qs-uuid-123',
            'deadline' => 7,
        ], $overrides));
    }

    // --- index() ---

    public function test_it_paginates_assessments_ordered_by_given_column_and_direction(): void
    {
        Assessment::factory()->create(['candidate_name' => 'Alice', 'created_at' => now()->subDays(2)]);
        Assessment::factory()->create(['candidate_name' => 'Bob', 'created_at' => now()->subDays(1)]);

        $service = new AssessmentService(app(SparkHireServiceInterface::class));

        $result = $service->index($this->makeIndexDto());

        $this->assertSame(2, $result->total());
        $this->assertSame('Bob', $result->items()[0]->candidate_name); // most recent first (desc)
    }

    public function test_it_respects_per_page_and_page_params(): void
    {
        Assessment::factory()->count(15)->create();

        $service = new AssessmentService(app(SparkHireService::class));

        $result = $service->index($this->makeIndexDto(['per_page' => 10, 'page' => 2]));

        $this->assertSame(5, $result->count());
        $this->assertSame(2, $result->currentPage());
    }

    // --- show() ---

    public function test_it_returns_the_assessment_when_found(): void
    {
        $assessment = Assessment::factory()->create();

        $service = new AssessmentService(app(SparkHireService::class));

        $result = $service->show($assessment->uuid);

        $this->assertTrue($result->is($assessment));
    }

    public function test_it_returns_null_when_assessment_not_found(): void
    {
        $service = new AssessmentService(app(SparkHireService::class));

        $this->assertNull($service->show('non-existent-uuid'));
    }

    // --- store() ---

    public function test_it_creates_an_assessment_from_a_valid_sparkhire_response(): void
    {
        $mock = Mockery::mock(SparkHireServiceInterface::class);
        $mock->shouldReceive('createAssessment')->once()->andReturn([
            [
                'uuid' => 'new-uuid-123',
                'type' => 'one_way',
                'status' => 'accepted',
                'candidate' => ['name' => 'Jane Doe', 'email' => 'jane@example.com', 'avatar' => null],
                'job' => ['uuid' => 'job-uuid-123', 'title' => 'Backend Engineer'],
                'due_at' => now()->addDays(7)->toIso8601String(),
            ],
        ]);

        $service = new AssessmentService($mock);
        $result = $service->store($this->makeCreateDto());

        $this->assertNotNull($result);
        $this->assertSame('new-uuid-123', $result->uuid);
        $this->assertSame('Jane Doe', $result->candidate_name);
        $this->assertSame('job-uuid-123', $result->job_uuid);
        $this->assertDatabaseHas('assessments', ['uuid' => 'new-uuid-123']);
    }

    public function test_it_returns_null_when_sparkhire_returns_a_malformed_response(): void
    {
        $mock = Mockery::mock(SparkHireServiceInterface::class);
        $mock->shouldReceive('createAssessment')->once()->andReturn(null);

        $service = new AssessmentService($mock);

        $this->assertNull($service->store($this->makeCreateDto()));
    }

    public function test_it_returns_null_when_sparkhire_returns_an_empty_array(): void
    {
        $mock = Mockery::mock(SparkHireServiceInterface::class);
        $mock->shouldReceive('createAssessment')->once()->andReturn([]);

        $service = new AssessmentService($mock);

        $this->assertNull($service->store($this->makeCreateDto()));
    }

    public function test_it_returns_null_when_response_item_is_missing_a_uuid(): void
    {
        $mock = Mockery::mock(SparkHireServiceInterface::class);
        $mock->shouldReceive('createAssessment')->once()->andReturn([
            ['status' => 'accepted'], // no uuid key
        ]);

        $service = new AssessmentService($mock);

        $this->assertNull($service->store($this->makeCreateDto()));
    }

    public function test_it_does_not_resurrect_a_soft_deleted_assessment_with_same_uuid(): void
    {
        $trashed = Assessment::factory()->create(['uuid' => 'dup-uuid']);
        $trashed->delete();

        $mock = Mockery::mock(SparkHireServiceInterface::class);
        $mock->shouldReceive('createAssessment')->once()->andReturn([
            [
                'uuid' => 'dup-uuid',
                'type' => 'One-Way',
                'status' => 'accepted',
                'candidate' => ['name' => 'Someone', 'email' => 'someone@example.com'],
                'job' => ['uuid' => 'job-x', 'title' => 'Title'],
                'due_at' => now()->addDays(3)->toIso8601String(),
            ],
        ]);

        $service = new AssessmentService($mock);

        $this->assertNull($service->store($this->makeCreateDto()));
    }

    // --- destroy() ---

    public function test_it_deletes_an_existing_assessment(): void
    {
        $assessment = Assessment::factory()->create();

        $service = new AssessmentService(app(SparkHireService::class));

        $this->assertTrue($service->destroy($assessment->uuid));
        $this->assertSoftDeleted('assessments', ['uuid' => $assessment->uuid]);
    }

    public function test_it_returns_false_when_deleting_a_non_existent_assessment(): void
    {
        $service = new AssessmentService(app(SparkHireService::class));

        $this->assertFalse($service->destroy('non-existent-uuid'));
    }
}
