class UsersController < ApplicationController
    # skip_before_action :authorize, only: :create

    #sign-up
    def create
         user = User.create!(user_params)
         if user.valid?
             session[:user_id] = user.id
             render json: user, status: :created
         else
             render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
         end
     end
 
     #keep logged-in
     def show
         current_user = User.find(session[:user_id])
         render json: current_user, status: :ok
         
     end
 
     private
 
     #default bio param will have "complete your bio" displayed in it on creation of a user, can change this with profile edit funciton
     def user_params
         params.permit(:name, :username, :bio, :password, :password_confirmation)
     end
end
