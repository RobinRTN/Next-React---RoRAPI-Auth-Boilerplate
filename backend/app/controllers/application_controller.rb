class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # Permit additional parameters for account update
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username picture_number])
  end
end
