/*
 Navicat Premium Data Transfer

 Source Server         : juice-shop-manager
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : juice-shop-manager

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 10/12/2022 18:17:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attribute
-- ----------------------------
DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '属性id',
  `attribute_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '属性名称',
  `attribute_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '属性值',
  `status` int(0) DEFAULT 1 COMMENT '属性状态 1启用 0禁用',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `attribute_name`(`attribute_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attribute
-- ----------------------------
INSERT INTO `attribute` VALUES (2, '111', '红色,蓝色,绿色', 1, 1, '2022-11-02 17:17:58', '2022-11-02 17:28:26');

-- ----------------------------
-- Table structure for carousel_image
-- ----------------------------
DROP TABLE IF EXISTS `carousel_image`;
CREATE TABLE `carousel_image`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '轮播图名称',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片',
  `status` int(0) DEFAULT 1 COMMENT '轮播图状态 1启用 0 禁用',
  `order_num` int(0) DEFAULT 9999 COMMENT '排序',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0 删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `title`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carousel_image
-- ----------------------------
INSERT INTO `carousel_image` VALUES (2, '轮播图2', 'https://img.alicdn.com/imgextra/i1/6000000005074/O1CN01VSanHD1nLwQQCOIvy_!!6000000005074-0-octopus.jpg', 1, 1, 1, '2022-11-07 12:11:06', '2022-11-09 11:56:39');
INSERT INTO `carousel_image` VALUES (4, '轮播图3', 'https://img.alicdn.com/imgextra/i1/6000000005074/O1CN01VSanHD1nLwQQCOIvy_!!6000000005074-0-octopus.jpg', 1, 2, 1, '2022-11-08 14:54:44', '2022-11-09 11:57:01');
INSERT INTO `carousel_image` VALUES (5, '轮播图4', 'https://img.alicdn.com/imgextra/i1/6000000005074/O1CN01VSanHD1nLwQQCOIvy_!!6000000005074-0-octopus.jpg', 1, 3, 1, '2022-11-08 14:55:02', '2022-11-09 11:57:03');
INSERT INTO `carousel_image` VALUES (6, '轮播图5', 'https://img.alicdn.com/imgextra/i1/6000000005074/O1CN01VSanHD1nLwQQCOIvy_!!6000000005074-0-octopus.jpg', 1, 9999, 1, '2022-11-09 11:15:39', '2022-11-09 11:57:05');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分类名称',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分类图片',
  `status` int(0) DEFAULT 1 COMMENT '状态 1 启用 0禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `category_name`(`category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (3, '上装', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, '1111', 1, '2022-11-01 16:42:34', '2022-11-19 14:27:33');
INSERT INTO `category` VALUES (4, '裤装', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:42:52', '2022-11-19 14:27:34');
INSERT INTO `category` VALUES (5, '特价区', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:42:59', '2022-11-19 14:27:35');
INSERT INTO `category` VALUES (6, '裙装', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:07', '2022-11-19 14:27:36');
INSERT INTO `category` VALUES (7, '套装', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:16', '2022-11-19 14:27:38');
INSERT INTO `category` VALUES (8, '外套', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, '123', 1, '2022-11-01 16:43:21', '2022-11-19 14:27:37');
INSERT INTO `category` VALUES (9, '秒杀', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:27', '2022-11-19 14:27:39');
INSERT INTO `category` VALUES (10, '内裤', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:32', '2022-11-19 14:27:40');
INSERT INTO `category` VALUES (11, '袜子', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:38', '2022-11-19 14:27:41');
INSERT INTO `category` VALUES (12, '鞋', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1, NULL, 1, '2022-11-01 16:43:42', '2022-11-19 14:27:43');

-- ----------------------------
-- Table structure for logistics
-- ----------------------------
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '物流id',
  `tracking_number` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '快递单号',
  `tracking_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '快递名称',
  `order_id` int(0) DEFAULT NULL COMMENT '订单id',
  `is_delete` int(0) DEFAULT 1 COMMENT '是否删除 1 未删除 0删除',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '物流描述',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tracking_number`(`tracking_number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logistics
-- ----------------------------
INSERT INTO `logistics` VALUES (1, 'KD-2022120510000', 'Juice快递', 2, 1, '把数据发件方了解到司法局按间里#￥#432432434', '2022-12-05 16:31:19', '2022-12-05 16:31:19');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_number` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单编号（J-当前日期8位数+10000递增）',
  `user_id` int(0) DEFAULT NULL COMMENT '用户id',
  `cart_ids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '购物车ids',
  `total_amount` decimal(10, 2) DEFAULT NULL COMMENT '订单总金额',
  `total_quantity` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单产品总数量',
  `status` int(0) DEFAULT 1 COMMENT '订单状态（1 待付款 2待发货 3待收货 4待评价）',
  `receiver` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '收货人',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '详细收货地址',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '收货人电话',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1 未删除 0 已删除',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单备注',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_number`(`order_number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (2, 'J-2022112210000', 1, '3,2,1', 3000.00, '30', 3, 'kay.', '深圳龙岗坂田', '123456789', 1, '这是一个测试订单', '2022-11-22 17:59:19', '2022-12-05 16:31:19');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `spu` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'SPU(当前日期 20221031+【产品数量+1】) 11位数',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品名称',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '主图',
  `price` decimal(10, 2) DEFAULT 0.00 COMMENT '价格',
  `details_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品详情图片',
  `status` int(0) DEFAULT 1 COMMENT '商品状态 1启用 0 禁用',
  `category_id` int(0) DEFAULT NULL COMMENT '类目id',
  `categoryName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '类目名称',
  `inventory` int(0) DEFAULT 10 COMMENT '库存',
  `attributes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '属性（尺码，规格，颜色）',
  `attributesName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '属性名称',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品描述',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `title`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (2, '123', 'aa', 'aaa', 10.00, NULL, 1, 3, NULL, 10, '1', NULL, NULL, 1, '2022-11-24 12:14:18', '2022-11-30 10:54:52');
INSERT INTO `product` VALUES (3, '1234', 'bb', 'bbb', 100.00, NULL, 0, 4, NULL, 10, '1', NULL, NULL, 0, '2022-11-24 12:14:34', '2022-11-30 10:54:58');
INSERT INTO `product` VALUES (4, '202200000', '年衣童装女童卫衣秋冬2022新款男童长袖T恤儿童套头加绒上衣亲子', 'http://rkywhs3b8.hn-bkt.clouddn.com/a29aed3e184abaae050e56e6921d9c38.jpg', 159.00, 'http://rkywhs3b8.hn-bkt.clouddn.com/cdc1eea027af787847b8ab6ceaa16d98.jpg,http://rkywhs3b8.hn-bkt.clouddn.com/cc19b35af2ed0e5cc1cfe337701d4433.jpg,http://rkywhs3b8.hn-bkt.clouddn.com/65bc37aa539a5c8e80faf06331262e8d.jpg', 1, 3, '上装', 20, '2', '111', '品牌：年衣适用年龄：4岁 5岁 6岁 7岁 8岁 9岁 10岁 11岁 12岁 13岁 14岁\n面料：其他/other\n图案：卡通动漫适用性别：男女通用模特实拍：实拍有模特\n是否带帽子：否颜色分类：年衣红 燕颔蓝 金莺黄 淡绯货号：N4224063A06\n参考身高：90cm 100cm 110cm 120cm 130cm 140cm 150cm适用季节：冬季上市年份季节：2022年冬\n材质成分：其他材质100%', 1, '2022-11-22 18:30:13', '2022-11-22 18:30:13');

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `user_id` int(0) DEFAULT NULL COMMENT '用户id',
  `product_id` int(0) DEFAULT NULL COMMENT '产品id',
  `spu` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品标识',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品标题',
  `price` decimal(10, 2) DEFAULT NULL COMMENT '产品价格',
  `quantity` int(0) DEFAULT NULL COMMENT '购买数量',
  `specifications` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品规格值，采用json数组格式',
  `product_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品主图',
  `is_delete` int(0) DEFAULT 1 COMMENT '购物车软删除 1 0',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopping_cart
-- ----------------------------
INSERT INTO `shopping_cart` VALUES (1, 1, 11, '202200002', '吹风机2', 100.00, 10, '蓝色-xl-1', 'http://localhost:7001/swagger-ui.html#/', 0, '2022-11-18 17:54:58', '2022-12-05 18:25:06');
INSERT INTO `shopping_cart` VALUES (2, 1, 12, '202200002', '吹风机23', 100.00, 10, '蓝色-xl-2', 'http://localhost:7001/swagger-ui.html#/', 0, '2022-11-19 09:49:12', '2022-12-05 18:24:50');
INSERT INTO `shopping_cart` VALUES (3, 1, 13, '202200002', '吹风机24', 100.00, 10, '蓝色-xl-3', 'http://localhost:7001/swagger-ui.html#/', 0, '2022-11-19 09:51:04', '2022-12-05 18:25:09');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '名称',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `sex` int(0) DEFAULT 1 COMMENT '性别 1 男 0 女',
  `status` int(0) DEFAULT 1 COMMENT '状态 1 启用 0 禁用',
  `balance` decimal(10, 2) DEFAULT 0.00 COMMENT '用户余额',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1 未删除 0 删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'kay', 'admin', '123456', 1, 1, 0.00, '2821800369@qq.com', 1, '2022-10-31 12:22:09', '2022-10-31 12:24:43');
INSERT INTO `user` VALUES (2, 'tinger.', 'ting111', '123456', 1, 1, 0.00, NULL, 1, '2022-10-31 12:25:59', '2022-10-31 12:26:13');
INSERT INTO `user` VALUES (3, 'test222', 'admintest', '123456', 1, 1, 0.00, NULL, 1, '2022-11-04 15:57:52', '2022-11-04 15:58:53');

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user`  (
  `id` int(0) NOT NULL COMMENT 'id',
  `open_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户唯一标识',
  `session_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '会话密钥',
  `nick_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '微信默认地址',
  `avatar_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '微信头像',
  `balance` decimal(10, 2) DEFAULT 0.00 COMMENT '余额',
  `status` int(0) DEFAULT 1 COMMENT '微信用户状态 1启用 0禁用',
  `is_delete` int(0) DEFAULT 1 COMMENT '是否删除  1 0',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
