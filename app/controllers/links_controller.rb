class LinksController < ApplicationController

  def hotels
    
    @trip = Trip.find(params["link"]["trip_id"])
    @link = Link.create(urls: params["urls"].join(','))
    @trip.links.push(@link)
    @trip.save

    current_user.links.push(@link)
    current_user.save
    render nothing: true
  end

end
