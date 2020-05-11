json.array! @users do |user|
  json.id user.id
  json.name user.name
  # json.group_id user.group_user.group_id
end