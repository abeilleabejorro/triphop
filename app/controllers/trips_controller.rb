class TripsController < ApplicationController

  def home

  end

  def new
    @trip = Trip.new
  end

  def edit
    @trip = Trip.find(params["id"])
  end

  def create
    @trip = Trip.create(trip_params)
    @trip.admin = current_user
    @trip.save
    # redirect_to "/trips/"+@trip.id+"/edit"
    redirect_to edit_trip_path(@trip)
  end

  def update
    binding.pry
    # @trip = Trip.find(params["id"])
    # @trip.members << params["trip"]["members"]
  end

private
  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end
end
