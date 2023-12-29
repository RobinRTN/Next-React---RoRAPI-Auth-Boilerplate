class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_request!

  private

  def authenticate_request!
    if request.headers['Authorization'].present?
      authenticate_token || render_unauthorized
    else
      render_unauthorized
    end
  end

  def authenticate_token
    token = request.headers['Authorization'].split(' ').last
    puts token
    begin
      decoded_token = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'])
      puts decoded_token
      user_id = decoded_token.first['sub']
      @current_user = User.find_by(id: user_id)
    rescue JWT::DecodeError => e
      puts e
      puts "Error decoding"
    end
  end

  def render_unauthorized
    render json: { status: 401, message: 'Unauthorized' }, status: :unauthorized
  end

  protected

  def configure_permitted_parameters
    # Permit additional parameters for account update
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username picture_number])
  end
end
