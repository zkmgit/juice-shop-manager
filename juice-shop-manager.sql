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

 Date: 04/11/2022 14:43:43
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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '分类名称',
  `status` int(0) DEFAULT 1 COMMENT '状态 1 启用 0禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (3, '上装', 1, NULL, 1, '2022-11-01 16:42:34', '2022-11-01 16:42:34');
INSERT INTO `category` VALUES (4, '裤装', 1, NULL, 1, '2022-11-01 16:42:52', '2022-11-01 16:42:52');
INSERT INTO `category` VALUES (5, '特价区', 1, NULL, 1, '2022-11-01 16:42:59', '2022-11-01 16:42:59');
INSERT INTO `category` VALUES (6, '裙装', 1, NULL, 1, '2022-11-01 16:43:07', '2022-11-01 16:43:07');
INSERT INTO `category` VALUES (7, '套装', 1, NULL, 1, '2022-11-01 16:43:16', '2022-11-01 16:43:16');
INSERT INTO `category` VALUES (8, '外套', 1, NULL, 1, '2022-11-01 16:43:21', '2022-11-01 16:43:21');
INSERT INTO `category` VALUES (9, '秒杀', 1, NULL, 1, '2022-11-01 16:43:27', '2022-11-01 16:43:27');
INSERT INTO `category` VALUES (10, '内裤', 1, NULL, 1, '2022-11-01 16:43:32', '2022-11-01 16:43:32');
INSERT INTO `category` VALUES (11, '袜子', 1, NULL, 1, '2022-11-01 16:43:38', '2022-11-01 16:43:38');
INSERT INTO `category` VALUES (12, '鞋', 1, NULL, 1, '2022-11-01 16:43:42', '2022-11-01 16:43:42');

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
  `inventory` int(0) DEFAULT 10 COMMENT '库存',
  `attributes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '属性（尺码，规格，颜色）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品描述',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `is_delete` int(0) DEFAULT 1 COMMENT '软删除 1 未删除 0 删除',
  `create_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'kay', 'admin', '123456', 1, 1, '2821800369@qq.com', 1, '2022-10-31 12:22:09', '2022-10-31 12:24:43');
INSERT INTO `user` VALUES (2, 'tinger.', 'ting111', '123456', 1, 1, NULL, 1, '2022-10-31 12:25:59', '2022-10-31 12:26:13');

SET FOREIGN_KEY_CHECKS = 1;
