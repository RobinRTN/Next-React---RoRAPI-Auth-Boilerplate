class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  def self.find_or_create_from_google(data)
    user = find_or_initialize_by(email: data['email'])
    if user.new_record?
      user.password = Devise.friendly_token[0, 20]
      user.save
    end
    user
  end

  def self.find_or_create_from_facebook(data)
    user = find_or_initialize_by(email: data['email'])
    if user.new_record?
      user.password = Devise.friendly_token[0, 20]
      user.save
    end
    user
  end
end

# def self.create_user_for_google(data)
#   where(email: data["email"]).first_or_initialize.tap do |user|
#     user.email = data["email"]
#     user.password = Devise.friendly_token[0, 20] if user.new_record?
#     # Set other user attributes if needed
#     user.save!
#   end
# end
