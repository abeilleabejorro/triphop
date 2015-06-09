class Trip < ActiveRecord::Base
	belongs_to :admin, :class_name => "User"
	has_and_belongs_to_many :members, :class_name => "User"
  accepts_nested_attributes_for :members
	has_one :proposed_date
	has_many :transportations
	has_many :accomodations


def invited?
self.invited.split(", ")
end 
  
 
end
