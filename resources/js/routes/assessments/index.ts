import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::index
* @see app/Http/Controllers/Api/AssessmentController.php:15
* @route '/api/assessments'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\AssessmentController::store
* @see app/Http/Controllers/Api/AssessmentController.php:29
* @route '/api/assessments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/assessments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AssessmentController::store
* @see app/Http/Controllers/Api/AssessmentController.php:29
* @route '/api/assessments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssessmentController::store
* @see app/Http/Controllers/Api/AssessmentController.php:29
* @route '/api/assessments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::store
* @see app/Http/Controllers/Api/AssessmentController.php:29
* @route '/api/assessments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::store
* @see app/Http/Controllers/Api/AssessmentController.php:29
* @route '/api/assessments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
export const show = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/assessments/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
show.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assessment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assessment: args.assessment,
    }

    return show.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
show.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
show.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
const showForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
showForm.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::show
* @see app/Http/Controllers/Api/AssessmentController.php:22
* @route '/api/assessments/{assessment}'
*/
showForm.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\AssessmentController::destroy
* @see app/Http/Controllers/Api/AssessmentController.php:36
* @route '/api/assessments/{assessment}'
*/
export const destroy = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/assessments/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AssessmentController::destroy
* @see app/Http/Controllers/Api/AssessmentController.php:36
* @route '/api/assessments/{assessment}'
*/
destroy.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    if (Array.isArray(args)) {
        args = {
            assessment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        assessment: args.assessment,
    }

    return destroy.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssessmentController::destroy
* @see app/Http/Controllers/Api/AssessmentController.php:36
* @route '/api/assessments/{assessment}'
*/
destroy.delete = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::destroy
* @see app/Http/Controllers/Api/AssessmentController.php:36
* @route '/api/assessments/{assessment}'
*/
const destroyForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AssessmentController::destroy
* @see app/Http/Controllers/Api/AssessmentController.php:36
* @route '/api/assessments/{assessment}'
*/
destroyForm.delete = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const assessments = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    destroy: Object.assign(destroy, destroy),
}

export default assessments