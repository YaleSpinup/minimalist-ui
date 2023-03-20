const taskLifeCycle = {
    PROVISIONING: {
        stage: 1
    },
    PENDING: {
        stage: 2
    },
    ACTIVATING: {
        stage: 3
    },
    RUNNING: {
        stage: 4
    },
    DEACTIVATING: {
        stage: 3
    },
    STOPPING: {
        stage: 2
    },
    DEPROVISIONING: {
        stage: 1
    },
    STOPPED: {
        stage: 0
    }
}

export const sortTasksByLifeCycleStage = (taskA, taskB) => {
    const taskAStage = getLifeCycleStage(taskA.LastStatus)
    const taskBStage = getLifeCycleStage(taskB.LastStatus)

    return taskAStage > taskBStage ? -1 : 1
}

export const getLifeCycleStatuses = () => Object.keys(taskLifeCycle)

export const getLifeCycleStage = (cycle) => (taskLifeCycle[cycle] || {}).stage

export default taskLifeCycle
