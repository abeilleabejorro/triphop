require 'open-uri'
class Trip < ActiveRecord::Base
	belongs_to :admin, :class_name => "User"
	has_and_belongs_to_many :members, :class_name => "User"
  accepts_nested_attributes_for :members
	has_one :proposed_date
	has_many :proposed_dates
	has_many :transportations
  has_many :accomodations
	has_many :links

	def invited?
	invited = self.invited.split(", ")
	confirmed = []
	self.members.each do |member|
			confirmed << member.email
		end
	invited.select {|p| confirmed.include?(p)==false}
	end 
	
	def confirmed
		confirmed ||= []
		self.members.each do |member|
			confirmed << member.email
		end
		confirmed
	end 


	def getRentalCar(trip)
		# creates query from params
		query = getQueryParams(trip)
	  hotwireUrl = "http://api.hotwire.com/v1/search/car?apikey=hkgbckq9muc4m7qbcrs5w5gz&format=json"+query
	  #gets JSON
		response = JSON.parse(open(hotwireUrl).read)
		results = response['Result'].first(4)
		cars = response['MetaData']['CarMetaData']['CarTypes']
		#create keys
		@keys = carTypesKey(cars)
		#prepare resultsArray
		return createCarsHatch(results)
	end

	def getQueryParams(trip)
		tdest = trip.origin.gsub(' ','')
		tstart =  trip.start_date.strftime("%m/%d/%Y")
		tend = trip.end_date.strftime("%m/%d/%Y")
		data = "&dest="+tdest+"&startdate="+tstart+"&enddate="+tend+"&pickuptime=10:00&dropofftime=22:30"
		return data
	end

	def createCarsHatch(results)
		resultsArray = []
		results.each do |car|
			code = car['CarTypeCode']
			image = "cars/#{code.downcase}.png"
			resultsArray << {
				type: "#{ @keys[code][:name] }",
				passengers: "#{ @keys[code][:passengers] }",
				milage: "#{ car['MileageDescription'] }",
				pickup: "#{ car['PickupAirport'] }",
				link: "#{ car['DeepLink'] }",
				price: "#{ car['TotalPrice'] }",
				image: image
			}
		end
		return resultsArray
	end

	def carTypesKey(cars)
		keyHash = {}
		cars.each do |car|
			keyHash[car['CarTypeCode']] = {
				name: "#{car['CarTypeName']} Car",
				passengers: "#{car['TypicalSeating']}" }
		end
		return keyHash
	end

end
