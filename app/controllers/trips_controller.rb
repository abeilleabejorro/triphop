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
    User.invite!(:email => "najjar.dana@gmail.com", :name => "John Doe")
    @trip.admin = current_user
    @trip.save
    # redirect_to "/trips/"+@trip.id+"/edit"
    redirect_to edit_trip_path(@trip)
  end

  def update
    @trip = Trip.find(params["id"])

    if User.find_by(email: params["trip"]["members"])
      @member = User.find_by(email: params["trip"]["members"])
      @trip.members << @member
      @trip.save
    else #user needs to sign up

    end
  end

private
  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end
end
