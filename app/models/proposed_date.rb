class ProposedDate < ActiveRecord::Base
	validate :date_cannot_be_in_the_past
	validate :ends_before_start

  belongs_to :trip
  belongs_to :user

  def date_cannot_be_in_the_past
    errors.add(:start, "Oops..your trip couldn't be created. Currently we can't go back in time") if
       self.start.to_date <= Date.today
      # self.start<=Date.today.strftime("%m/%d/%Y")
  end
  def ends_before_start
    errors.add(:end, "Oops.. your trip couldn't be created. There is a conflict with your dates") if
       self.start > self.end
      # self.start<=Date.today.strftime("%m/%d/%Y")
  end
  

end
