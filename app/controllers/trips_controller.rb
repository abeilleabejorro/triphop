class TripsController < ApplicationController
before_action :require_login, only: [:show, :edit, :update]

  def home

  end

  def show
    @trip = Trip.find(params[:id])
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
    current_user.trips << @trip
    redirect_to edit_trip_path(@trip)
  end

  def update
    # binding.pry
    @trip = Trip.find(params["id"])
    if User.find_by(email: params["trip"]["members"])
      @member = User.find_by(email: params["trip"]["members"])
      session["member"]=@member
      MyMailer.add_existing_member(@member, @trip).deliver_now
    else #user needs to sign up
      @member = User.new(email: params["trip"]["members"])
      MyMailer.add_new_member(@member, @trip).deliver_now
    end
     # add @member's email to invited array
    render nothing: true
  end

  def all
    @all ||= self.members
    @all << self.admin
    return @all
  end

private

    def require_login
    # trips/11/
    unless signed_in?
      #if you're not signed in, check if user is a member (in database)
      # binding.pry
      flash[:error] = "You must be logged in to access this section"
      session["path"]=request.path
      redirect_to new_user_session_path
    end
    # add current_user to trip from session path
  end

  def trip_params
    params.require(:trip).permit(:name, :description, :origin, :destination)
  end
end


