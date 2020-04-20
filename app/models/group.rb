class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true


  def show_last_message
    if messages.present?
      if messages[-1].text.present?
        messages[-1].text
      else
        "画像が投稿されています"
      end
    else
      "まだメッセージはないよ。"
    end
  end
end

