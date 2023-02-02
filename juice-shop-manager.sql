/*
Navicat MySQL Data Transfer

Source Server         : juice-shop
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : juice-shop-manager

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2023-02-02 15:34:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for addr
-- ----------------------------
DROP TABLE IF EXISTS `addr`;
CREATE TABLE `addr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL COMMENT '省市区',
  `status` int(11) DEFAULT '1' COMMENT '1启用 0禁用',
  `address` text COMMENT '详细地址',
  `phone` varchar(255) DEFAULT NULL COMMENT '用户号码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_delete` int(11) DEFAULT '1' COMMENT '1未删除 0已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for attribute
-- ----------------------------
DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性id',
  `attribute_name` varchar(100) DEFAULT NULL COMMENT '属性名称',
  `attribute_value` varchar(255) DEFAULT NULL COMMENT '属性值',
  `status` int(11) DEFAULT '1' COMMENT '属性状态 1启用 0禁用',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `attribute_name` (`attribute_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for carousel_image
-- ----------------------------
DROP TABLE IF EXISTS `carousel_image`;
CREATE TABLE `carousel_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(100) DEFAULT NULL COMMENT '轮播图名称',
  `image` varchar(255) DEFAULT NULL COMMENT '图片',
  `status` int(11) DEFAULT '1' COMMENT '轮播图状态 1启用 0 禁用',
  `order_num` int(11) DEFAULT '9999' COMMENT '排序',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1未删除 0 删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `title` (`title`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` varchar(255) DEFAULT NULL COMMENT '分类名称',
  `image` varchar(255) DEFAULT NULL COMMENT '分类图片',
  `status` int(11) DEFAULT '1' COMMENT '状态 1 启用 0禁用',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `category_name` (`category_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for logistics
-- ----------------------------
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '物流id',
  `tracking_number` varchar(50) DEFAULT NULL COMMENT '快递单号',
  `tracking_name` varchar(200) DEFAULT NULL COMMENT '快递名称',
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `is_delete` int(11) DEFAULT '1' COMMENT '是否删除 1 未删除 0删除',
  `remark` varchar(255) DEFAULT NULL COMMENT '物流描述',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `tracking_number` (`tracking_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_number` varchar(200) DEFAULT NULL COMMENT '订单编号（J-当前日期8位数+10000递增）',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `cart_ids` varchar(255) DEFAULT NULL COMMENT '购物车ids',
  `total_amount` decimal(10,2) DEFAULT NULL COMMENT '订单总金额',
  `total_quantity` varchar(100) DEFAULT NULL COMMENT '订单产品总数量',
  `status` int(11) DEFAULT '1' COMMENT '订单状态（1 待付款 2待发货 3待收货 4待评价）',
  `receiver` varchar(100) DEFAULT NULL COMMENT '收货人',
  `address` varchar(255) DEFAULT NULL COMMENT '详细收货地址',
  `phone` varchar(255) DEFAULT NULL COMMENT '收货人电话',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1 未删除 0 已删除',
  `remark` varchar(255) DEFAULT NULL COMMENT '订单备注',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `order_number` (`order_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `spu` varchar(50) DEFAULT NULL COMMENT 'SPU(当前日期 20221031+【产品数量+1】) 11位数',
  `title` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `image` varchar(255) DEFAULT NULL COMMENT '主图',
  `price` decimal(10,2) DEFAULT '0.00' COMMENT '价格（现价）',
  `original_price` decimal(10,2) DEFAULT '0.00' COMMENT '原价',
  `details_img` varchar(255) DEFAULT NULL COMMENT '商品详情图片',
  `status` int(11) DEFAULT '1' COMMENT '商品状态 1启用 0 禁用',
  `category_id` int(11) DEFAULT NULL COMMENT '类目id',
  `categoryName` varchar(50) DEFAULT NULL COMMENT '类目名称',
  `inventory` int(11) DEFAULT '10' COMMENT '库存',
  `attributes` varchar(255) DEFAULT NULL COMMENT '属性（尺码，规格，颜色）',
  `attributesName` varchar(255) DEFAULT NULL COMMENT '属性名称',
  `buy_quantity` int(11) DEFAULT '0' COMMENT '用户购买数量',
  `remark` varchar(255) DEFAULT NULL COMMENT '商品描述',
  `seckill_start_time` timestamp NULL DEFAULT NULL COMMENT '限时秒杀开始时间',
  `seckill_end_time` timestamp NULL DEFAULT NULL COMMENT '限时秒杀结束时间',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1未删除 0删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `title` (`title`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for shopping_cart
-- ----------------------------
DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE `shopping_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `product_id` int(11) DEFAULT NULL COMMENT '产品id',
  `spu` varchar(50) DEFAULT NULL COMMENT '产品标识',
  `title` varchar(255) DEFAULT NULL COMMENT '产品标题',
  `price` decimal(10,2) DEFAULT NULL COMMENT '产品价格',
  `quantity` int(11) DEFAULT NULL COMMENT '购买数量',
  `specifications` varchar(255) DEFAULT NULL COMMENT '产品规格值，采用json数组格式',
  `product_image` varchar(255) DEFAULT NULL COMMENT '产品主图',
  `is_delete` int(11) DEFAULT '1' COMMENT '购物车软删除 1 0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `sex` int(11) DEFAULT '1' COMMENT '性别 1 男 0 女',
  `status` int(11) DEFAULT '1' COMMENT '状态 1 启用 0 禁用',
  `balance` decimal(10,2) DEFAULT '0.00' COMMENT '用户余额',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `is_delete` int(11) DEFAULT '1' COMMENT '软删除 1 未删除 0 删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `open_id` varchar(255) DEFAULT NULL COMMENT '用户唯一标识',
  `session_key` varchar(255) DEFAULT NULL COMMENT '会话密钥',
  `nick_name` varchar(200) DEFAULT NULL COMMENT '昵称',
  `addr` varchar(255) DEFAULT NULL COMMENT '微信默认地址',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '微信头像',
  `balance` decimal(10,2) DEFAULT '0.00' COMMENT '余额',
  `status` int(11) DEFAULT '1' COMMENT '微信用户状态 1启用 0禁用',
  `is_delete` int(11) DEFAULT '1' COMMENT '是否删除  1 0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
