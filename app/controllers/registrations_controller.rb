class RegistrationsController < Devise::RegistrationsController
  after_action

  def new
    @user = User.new
  end

  def create
    #log in
    @user = User.create(sign_up_params)

    if session["path"]
      #associate them to the group
      @trip = Trip.find(session["path"].split("/")[2].to_i)
      @trip.members << @user
      @user.trips << @trip
      redirect_to session["path"]
    else
      # render '/trips/new'
      render nothing: true
    end

  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end
