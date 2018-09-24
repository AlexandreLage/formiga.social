class Post < ApplicationRecord
  has_many_attached :pictures

  # def picture_attached?
  #   self.picture.attached?
  # end
end
