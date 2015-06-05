class ProposedDatesController < ApplicationController
	helper_method :date_params


	def date_params
    params.require(:proposed_dates).permit(:start, :end)
  end

end
