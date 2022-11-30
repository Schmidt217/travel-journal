class TripsController < ApplicationController

    #GET all trips
    def index
        trip = Trip.all
        render json: trip, status: :ok
    end

    #GET individual trip based on id
    def show
        trip = Trip.find(params[:id])
        render json: trip, status: :ok
    end

    #POST - create a new trip
    def create
        debugger
        newTrip = Trip.create!(trip_params)
        render json: newTrip, status: :created
    end

    #PATCH - update an existing trip
    def update 
        trip = Trip.find(params[:id])
        trip.update!(trip_params)
        render json: trip, status: :ok
    end

    #DELETE a trip
    def destroy
        trip = Trip.find(params[:id])
        trip.destroy
        head :no_content
    end

    private

    def trip_params
        params.permit(:name, :location, :date, :details, :private, :user_id, images:[])
    end

end
