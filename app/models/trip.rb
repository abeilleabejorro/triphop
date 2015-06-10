class Trip < ActiveRecord::Base
	belongs_to :admin, :class_name => "User"
	has_and_belongs_to_many :members, :class_name => "User"
	has_one :proposed_date
	has_many :transportations
  has_many :accomodations
	has_many :links


def invited?
self.invited.split(", ")
end


end
