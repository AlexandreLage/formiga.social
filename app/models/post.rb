class Post < ApplicationRecord
  has_one_attached :picture

  def picture_attached?
    self.picture.attached?
  end
end
