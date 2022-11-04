'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 配置 egg-swagger-doc 插件信息。
  swaggerdoc: {
    enable: true, // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

};
