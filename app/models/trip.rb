class Trip < ActiveRecord::Base
	belongs_to :admin, :class_name => "User"
	has_and_belongs_to_many :members, :class_name => "User", foreign_key: :user_id

def invited?
self.invited.split(", ")
end 
  
 
end
