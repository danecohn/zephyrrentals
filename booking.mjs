import {company,units} from './data/site.mjs';
export function arizonaToday(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Phoenix',year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
export function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T12:00:00Z');return Number.isFinite(d.valueOf())&&d.toISOString().slice(0,10)===value}
export function reservationURL(params,{today=arizonaToday()}={}){
 const unit=params.get('unit')||'',checkIn=params.get('checkIn')||'',checkOut=params.get('checkOut')||'',guestValue=params.get('guests')||'2';
 if(!['','1','2','3'].includes(unit))throw Error('Choose one of the three Old Town Lofts, or leave the loft open.');
 if(!/^[1-4]$/.test(guestValue))throw Error('Choose a guest count from one to four. Review the listing’s guest suitability before reserving.');
 if(Boolean(checkIn)!==Boolean(checkOut))throw Error('Choose both check-in and check-out dates, or leave both open to explore.');
 if(checkIn&&(!validDate(checkIn)||!validDate(checkOut)||checkOut<=checkIn||checkIn<today))throw Error('Choose valid dates, with check-out after check-in and arrival from today onward.');
 const listing=units.find(u=>String(u.id)===unit);const destination=new URL(company.bookingPath+(listing?'/'+listing.listingId:''),company.bookingOrigin);
 destination.searchParams.set('minOccupancy',guestValue);destination.searchParams.set('adults',guestValue);if(checkIn){destination.searchParams.set('checkIn',checkIn);destination.searchParams.set('checkOut',checkOut)}
 return destination;
}
