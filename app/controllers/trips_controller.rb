class TripsController < ApplicationController

    #GET all public trips
    def index
        # publicTrips = []
        publicTrips = Trip.all.select do |trip|
            trip.private == false
        end
        render json: publicTrips, status: :ok
    end

    #GET individual trip based on id
    def show
        trip = Trip.find(params[:id])
        render json: trip, status: :ok
    end

    #POST - create a new trip
    def create
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
        trip.images.purge
        trip.destroy
        head :no_content
    end

    # ------ custom actions for trip images ------- #
    #Get single image associated with a trip
    def findImage
        trip = Trip.find(params[:id])
        image = trip.images.find(params[:attachment_id])
        render json: image, status: :ok
    end

    def deleteImage
        trip = Trip.find(params[:id])
        image = trip.images.find(params[:attachment_id])
        image.purge
        head :no_content 
    end

    private

    def trip_params
        params.permit(:name, :location, :date, :details, :private, :user_id, images:[])
    end

end
