class ActivitiesController < ApplicationController

    #GET an individual activity by id
    def show
        activity = Activity.find(params[:id])
        render json: activity, status: :ok
    end

    #POST - create new activity
    def create
        activity = Activity.create!(activity_params)
        render json: activity, status: :ok
    end

    #PATCH - update existing activity
    def update
        activity = Activity.find(params[:id])
        activity.update!(activity_params)
        render json: activity, status: :accepted
    end

    #DELETE an activity
    def destroy
        activity = Activity.find(params[:id])
        activity.destroy
        head :no_content
    end

    private

    def activity_params
        params.permit(:title, :category, :description, :trip_id )
    end

end
