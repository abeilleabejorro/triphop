class RegistrationsController < Devise::RegistrationsController

  def create
  #log in
    if session["path"]  
      #associate them to the group
      redirect_to show
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
