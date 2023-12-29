require 'httparty'

class Users::SocialsController < Devise::SessionsController
  skip_before_action :authenticate_request!

  # frozen_string_literal: true

  include HTTParty
  include RackSessionsFix
  respond_to :json

  def authenticate_google
    response = google_credential_check(params[:credential])
    if response.code == 200
      user_info = response.parsed_response
      user = User.find_or_create_from_google(user_info)

      if user.persisted?
        jwt_token = generate_jwt_for_user(user)
        render json: {
          status: { code: 200, message: 'Logged in successfully.' },
          data: {
            user: UserSerializer.new(user).serializable_hash[:data][:attributes],
            token: jwt_token
          }
        }
      else
        render json: { status: { message: "Authentication failed. #{user.errors.full_messages.to_sentence}" } }, status: :unprocessable_entity
      end
    else
      render json: { status: { message: 'Invalid Google token' } }, status: :unprocessable_entity
    end
  end

  def authenticate_facebook
    response = facebook_credential_check(params[:credential])
    if response.code == 200
      user_info = response.parsed_response
      user = User.find_or_create_from_facebook(user_info)

      if user.persisted?
        jwt_token = generate_jwt_for_user(user)
        render json: {
          status: { code: 200, message: 'Logged in successfully.' },
          data: {
            user: UserSerializer.new(user).serializable_hash[:data][:attributes],
            token: jwt_token
          }
        }
      else
        render json: { status: { message: "Authentication failed. #{user.errors.full_messages.to_sentence}" } }, status: :unprocessable_entity
      end
    else
      render json: { status: { message: 'Invalid Facebook token' } }, status: :unprocessable_entity
    end
  end

  private

  def google_credential_check(token)
    HTTParty.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{token}")
  end

  def facebook_credential_check(token)
    HTTParty.get("https://graph.facebook.com/me?fields=name,email&access_token=#{token}")
  end

  def generate_jwt_for_user(user)
    payload = {
      jti: user.jti,
      sub: user.id,
      scp: 'user',
      aud: nil,
      iat: Time.now.to_i,
      exp: 240.hours.from_now.to_i
    }

    JWT.encode(payload, ENV['DEVISE_JWT_SECRET_KEY'])
  end

end
