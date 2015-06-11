class ProposedDate < ActiveRecord::Base
	validate :date_cannot_be_in_the_past
  belongs_to :trip
  belongs_to :user
  def date_cannot_be_in_the_past
    errors.add(:ProposedDate, "Please check your dates") if
      self.start>=self.end or self.start<Date.today
  end

end
