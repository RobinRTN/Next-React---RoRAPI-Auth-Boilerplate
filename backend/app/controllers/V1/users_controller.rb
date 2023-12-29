module V1
  class UsersController < ApplicationController

    def check_username
      username = params[:username]
      user_exists = User.exists?(username: username)
      render json: { available: !user_exists }
    end

    def update_username
      if current_user.update(user_params)
        render json: { success: true }
      else
        render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :picture_number)
    end

  end
end
