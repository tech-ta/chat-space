# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :posts
- has_many :groups through: :users_groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|

### Association
- has_many :posts
- has_many :users through: :users_groups

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :users
- belong_to :groups

## postsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|img|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :users
- belong_to :groups





