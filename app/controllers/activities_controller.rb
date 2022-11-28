class ActivitiesController < ApplicationController

    def show
        activity = Activity.find(params[:id])
        render json: activity, status: :ok
    end

    def create
        activity = Activity.create!(activity_params)
        render json: activity, status: :ok
    end

    def update
        activity = Activity.find(params[:id])
        activity.update!(activity_params)
        render json: activity, status: :accepted
    end

    private

    def activity_params
        params.permit(:title, :category, :description, :trip_id )
    end

end
