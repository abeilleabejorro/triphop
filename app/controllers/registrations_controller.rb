class RegistrationsController < Devise::RegistrationsController
  after_action

  def new

    build_resource({})
    set_minimum_password_length
    yield resource if block_given?
    respond_with self.resource

    if params["id"]
      # binding.pry
      @trip = Trip.find(params["id"].to_i)
      session['path']="/trips/#{params["id"]}/edit"
    end
    #if they show up with trip id in params, session['path']=path
    # @user = User.new
  end

  def create
    @user = User.create(sign_up_params)
    sign_in(@user)

    if session["path"]
      @trip = Trip.find(session["path"].split("/")[2].to_i)
      add_user_to_trip(@trip, @user)
      # @trip.members.push(@user)
      # @trip.save
      # @user.save
      redirect_to session["path"]
    else
     redirect_to root_path
    end
  end

  private
  def add_user_to_trip(trip, user)
    @trip.members.push(@user)
    @trip.save
    @user.save
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end

