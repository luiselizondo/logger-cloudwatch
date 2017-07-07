# Logger Cloudwatch

Simple logger using Watson to log into AWS CloudWatch

# Usage

```
var logger = require('logger-cloudwatch')
logger.setProcess('someValue')

logger.i('Some message', objectWithExtraData)
logger.e('Some message', objectWithExtraData)
logger.w('Some message', objectWithExtraData)
logger.l('Some message', objectWithExtraData)
```

# Licence
Released under the MIT License
