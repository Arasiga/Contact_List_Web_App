class User < ActiveRecord::Base
  has_many :contacts

  validates_presence_of :email
  validates_presence_of :password
  validates_presence_of :repeat_password

  validates_uniqueness_of :email
end