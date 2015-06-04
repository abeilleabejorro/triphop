class UsersController < ApplicationController
  def trips
    @trips = current_user.trips
  end
end
