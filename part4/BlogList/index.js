
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = require('./app')

// 4.1 Blog List, step 1
// 4.2 Blog List, step 2



app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`)
})