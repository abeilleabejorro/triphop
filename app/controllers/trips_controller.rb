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
    @trip.update(admin: current_user)
    redirect_to edit_trip_path(@trip)
  end

  def update
    @trip = Trip.find(params["id"])

    if User.find_by(email: params["trip"]["members"])
      @member = User.find_by(email: params["trip"]["members"])
      binding.pry
    else #user needs to sign up
      binding.pry
      user = User.new(email: params["trip"]["members"])
      user.invite!
    end
  end

  def all
    @all ||= self.members
    @all << self.admin
    return @all
  end

private
  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end
end
