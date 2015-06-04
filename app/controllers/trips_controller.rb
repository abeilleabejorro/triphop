class TripsController < ApplicationController
before_action :require_login, only: [:show, :edit, :update]

  def home

  end

  def show
  end

  def index
    render nothing: true
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
    binding.pry
    @trip = Trip.find(params["id"])
    if User.find_by(email: params["trip"]["members"])
      @member = User.find_by(email: params["trip"]["members"])
      session["member"]=@member
    else #user needs to sign up
      @member = User.new(email: params["trip"]["members"])
    end
    MyMailer.add_member(@member, @trip).deliver_now

    render nothing: true
  end

  def all
    @all ||= self.members
    @all << self.admin
    return @all
  end

private

    def require_login
      if sessions[member]=sdf
        redirect_to sign in take them to 
    unless signed_in?
      flash[:error] = "You must be logged in to access this section"
      session["path"]=request.path
      binding.pry
      redirect_to new_user_registration_path #If the user doesn't exist
      #else take them to login and redirect to "do you want to join group?"
    end
  end

  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end
end
