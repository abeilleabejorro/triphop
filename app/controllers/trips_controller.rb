class TripsController < ApplicationController
  
  def home 
  
  end

  def new
    @trip = Trip.new
  end 

  def create
    @trip = Trip.create(trip_params)
    render nothing: true
  end 

private
  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end 
end
