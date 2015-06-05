class RegistrationsController < Devise::RegistrationsController
  after_action

  def new

    build_resource({})
    set_minimum_password_length
    yield resource if block_given?
    respond_with self.resource

    if params["id"]
      binding.pry
      session['path']="/trips/#{params["id"]}"
    end
    #if they show up with trip id in params, session['path']=path
    # @user = User.new
  end

  def create


    @user = User.create(sign_up_params)
    sign_in(@user)

    if session['path']
      binding.pry
      # send them to the trip page


      # @trip = Trip.find(session["path"].split("/")[2].to_i)
      # @trip.members << @user
      # @user.trips << @trip

    @user = User.create(sign_up_params)
    if session["path"]
     # @trip = Trip.find(session["path"].split("/")[2].to_i)
     #  @trip.members << @user
     #  @user.trips << @trip
      redirect_to session["path"]
    else
     redirect_to root_path
    end
    # render nothing: true
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end
