class TripsController < ApplicationController

    def index
        trip = Trip.all
        render json: trip, status: :ok
    end

    def show
        trip = Trip.find(params[:id])
        render json: trip, status: :ok
    end

    def create
        newTrip = Trip.create!(trip_params)
        render json: newTrip, status: :created
    end

    def update 
        trip = Trip.find(params[:id])
        trip.update!(trip_params)
        render json: trip, status: :ok
    end

    private

    def trip_params
        params.permit(:name, :location, :date, :details, :private, :user_id)
    end

end
