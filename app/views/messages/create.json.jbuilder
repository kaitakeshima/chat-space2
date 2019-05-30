json.id @message.id
json.group_id @message.group_id
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.(@message, :content, :image)
