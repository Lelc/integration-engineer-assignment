import AssessmentController from './AssessmentController'
import SparkHireController from './SparkHireController'

const Api = {
    AssessmentController: Object.assign(AssessmentController, AssessmentController),
    SparkHireController: Object.assign(SparkHireController, SparkHireController),
}

export default Api