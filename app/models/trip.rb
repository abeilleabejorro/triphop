require 'open-uri'
class Trip < ActiveRecord::Base
	belongs_to :admin, :class_name => "User"
	has_and_belongs_to_many :members, :class_name => "User"
	has_one :proposed_date
	has_many :transportations
	has_many :accomodations


def invited?
self.invited.split(", ")
end 

def getRentalCar(params, dates)
	query = getQueryParams(params, dates)
  hotwireUrl = "http://api.hotwire.com/v1/search/car?apikey=hkgbckq9muc4m7qbcrs5w5gz&format=json"+query
	response = JSON.parse(open(hotwireUrl).read)
	result = response['Result'].first 4
	return result
require "pry"
binding.pry
end
 
def getQueryParams(params, dates)
	tdest = @trip.origin.gsub(' ','')
	tstart =  @trip.start_date     
	tend = @trip.end_date
	data = "&dest="+tdest+"&startdate="+tstart+"&enddate="+tend+"&pickuptime=10:00&dropofftime=22:30"
	return data
end
 
end
