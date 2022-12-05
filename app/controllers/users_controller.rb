class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

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

     #PATCH - update a user profile (except password)
     def update
        user = User.find(params[:id])
        user.update!(user_update_params)
        render json: user, status: :accepted
     end
 
     #keep logged-in
     def show
         current_user = User.find(session[:user_id])
         render json: current_user, status: :ok
     end

     def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
     end
 
     private
 
     #default bio param will have "complete your bio" displayed in it on creation of a user, can change this with profile edit funciton

     def user_params
         params.permit(:name, :username, :bio, :password, :password_confirmation)
     end

     def user_update_params
        params.permit(:id, :name, :username, :bio, :avatar, :attachment)
     end
end
