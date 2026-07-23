import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
export const assessmentItem = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessmentItem.url(args, options),
    method: 'get',
})

assessmentItem.definition = {
    methods: ["get","head"],
    url: '/api/sparkhire/assessment-item/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
assessmentItem.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return assessmentItem.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
assessmentItem.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessmentItem.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
assessmentItem.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assessmentItem.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
const assessmentItemForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: assessmentItem.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
assessmentItemForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: assessmentItem.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::assessmentItem
* @see app/Http/Controllers/Api/SparkHireController.php:16
* @route '/api/sparkhire/assessment-item/{uuid}'
*/
assessmentItemForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: assessmentItem.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

assessmentItem.form = assessmentItemForm

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
export const jobs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jobs.url(options),
    method: 'get',
})

jobs.definition = {
    methods: ["get","head"],
    url: '/api/sparkhire/jobs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
jobs.url = (options?: RouteQueryOptions) => {
    return jobs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
jobs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: jobs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
jobs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: jobs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
const jobsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
jobsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::jobs
* @see app/Http/Controllers/Api/SparkHireController.php:23
* @route '/api/sparkhire/jobs'
*/
jobsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: jobs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

jobs.form = jobsForm

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
export const questionSets = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questionSets.url(options),
    method: 'get',
})

questionSets.definition = {
    methods: ["get","head"],
    url: '/api/sparkhire/question-sets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
questionSets.url = (options?: RouteQueryOptions) => {
    return questionSets.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
questionSets.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: questionSets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
questionSets.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: questionSets.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
const questionSetsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questionSets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
questionSetsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questionSets.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::questionSets
* @see app/Http/Controllers/Api/SparkHireController.php:30
* @route '/api/sparkhire/question-sets'
*/
questionSetsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: questionSets.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

questionSets.form = questionSetsForm

/**
* @see \App\Http\Controllers\Api\SparkHireController::webhook
* @see app/Http/Controllers/Api/SparkHireController.php:37
* @route '/api/webhooks/sparkhire'
*/
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/api/webhooks/sparkhire',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SparkHireController::webhook
* @see app/Http/Controllers/Api/SparkHireController.php:37
* @route '/api/webhooks/sparkhire'
*/
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SparkHireController::webhook
* @see app/Http/Controllers/Api/SparkHireController.php:37
* @route '/api/webhooks/sparkhire'
*/
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::webhook
* @see app/Http/Controllers/Api/SparkHireController.php:37
* @route '/api/webhooks/sparkhire'
*/
const webhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\SparkHireController::webhook
* @see app/Http/Controllers/Api/SparkHireController.php:37
* @route '/api/webhooks/sparkhire'
*/
webhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

webhook.form = webhookForm

const SparkHireController = { assessmentItem, jobs, questionSets, webhook }

export default SparkHireController