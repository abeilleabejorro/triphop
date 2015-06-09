class SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?

    if session['path']
      @trip = Trip.find(session["path"].split("/")[2].to_i)
      #to do: check to make sure they're not already a member
      add_user_to_trip(trip, current_user)
      # @trip.members << current_user
      # @trip.save
      # current_user.save
      redirect_to session['path']
    else
    respond_with resource, location: after_sign_in_path_for(resource)
    end
  end
  private
  def add_user_to_trip(trip, user)
    @trip.members.push(@user) 
    @trip.save
    @user.save
  end 
  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
