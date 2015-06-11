class TripsController < ApplicationController
before_action :require_login, only: [:show, :edit, :update, :new]
before_action :getCars, only: [:show, :edit, :update]
skip_before_filter :verify_authenticity_token
# before_action :check_if_invited only: [:show]
# before_action :check_membership, only: [:show, :edit, :update]
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
    @link = Link.new
    @proposed_date = ProposedDate.new
    @trip = Trip.find(params["id"])
  end

  def create
    @trip = Trip.create(trip_params)
    @trip.update(invited: "" )
    @trip.update(admin: current_user)
    current_user.trips << @trip

    # relate and save proposed_dates
    @dates = ProposedDate.create(reformat_dates)
    @dates.update(trip_id:  @trip.id)
    @trip.update(start_date: @dates.start)
    @trip.update(end_date: @dates.end)
    @trip.save
    redirect_to edit_trip_path(@trip)

  end

  def update
    @trip = Trip.find(params["id"])
      params[:email].each do |email|
    if email != ""
      if User.find_by(email: email)
        @member = User.find_by(email: email)
        session["member"]=@member
        MyMailer.add_existing_member(@member, @trip).deliver_now
      else #user needs to sign up
        @member = User.new(email: email)
        MyMailer.add_new_member(@member, @trip).deliver_now
      end
      @trip.invited << email+", "
      @trip.save
    end
  end
     # add @member's email to invited array
    redirect_to edit_trip_path(@trip)
  end

  def destroy
    @trip = Trip.find(params[:id])
    @id = @trip.id
    @trip.destroy
    respond_to do |f|
      f.js
    end
     # redirect_to "/users/#{current_user.id}/trips"
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



  def reformat_dates
      start_date_array=params["proposed_dates"]["start"].split("/")
      end_date_array=params["proposed_dates"]["end"].split("/")
      start_date = start_date_array.insert(0, start_date_array.delete_at(2)).join("/")
      end_date = end_date_array.insert(0, end_date_array.delete_at(2)).join("/")
      formatted_dates={start: start_date, end: end_date}
   end

    def getCars
      trip = Trip.find(params["id"])
      # gets car rental if trip haven't started yet
      if trip.start_date > Date.today
         @cars = trip.getRentalCar(trip)
      end
    end
end


