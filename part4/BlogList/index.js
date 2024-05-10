
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = require('./app')


app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`)
})