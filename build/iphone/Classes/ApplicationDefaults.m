/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"Qbbaam5oJmI1o5n4YraVXrXLrSt4NriM"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"2uwwKuDqCiSk3pNo4MDx7FJVVW9mM6pI"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"fNo2iF8d3Zo3M35hTTdc77Y4f2gpaMjh"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"RaQ17Owof97SUeMmsu1sv2b2E83phTQn"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"cpKIZB9KSCwF35ipyWLTUYAzMOiyzuO0"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"T2BuqBApy0mqeYARp6p0vfsGRRzAeljG"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
